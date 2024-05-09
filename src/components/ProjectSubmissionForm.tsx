import React, { useState } from 'react';
import { Formik, Form, FieldArray, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Grid, Container, IconButton, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import CurrencySelect from './CurrencySelect'; // Assume this is a custom component for currency selection
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

const ProjectSubmissionFormSchema = Yup.object().shape({
  projectName: Yup.string().required('Project name is required'),
  ownerName: Yup.string().required('Owner name is required'),
  ownerTelegram: Yup.string().required('Owner Telegram is required'),
  ownerEmail: Yup.string().email('Invalid email').required('Owner email is required'),
  projectDescription: Yup.string().required('Project description is required'),
  imgDescription: Yup.string().required('Image description is required'),
  projectGoal: Yup.number().positive('Project goal must be a positive number').required('Project goal is required'),
  currency: Yup.string().required('Currency is required'),
  packages: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
      image: Yup.string().required('Image URL is required'),
      price: Yup.number().positive('Price must be a positive number').required('Price is required'),
    })
  ),
  roadmap: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      deliveryDate: Yup.date().required('Delivery date is required'),
      status: Yup.string().required('Status is required'),
    })
  ),
  endDate: Yup.date().required('End date is required'),
  imageLogo: Yup.mixed().required('An image logo is required'),
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProjectSubmissionForm: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [file, setFile] = useState<File | null>(null);

  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void }) => {
    try {
      if (file) {
        const imageLogoBase64 = await toBase64(file);
        values.imageLogo = imageLogoBase64;
      }
      const response = await axios.post('/api/v1/projects', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSnackbarMessage('Project submitted successfully!');
      setSnackbarSeverity('success');
      resetForm();
    } catch (error: any) {
      console.error('Submission error:', error);
      setSnackbarMessage(error.response?.data?.message || 'An error occurred while submitting the project.');
      setSnackbarSeverity('error');
    } finally {
      setSubmitting(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Project Submission Form
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Formik
          initialValues={{
            projectName: '',
            ownerName: '',
            ownerTelegram: '',
            ownerEmail: '',
            projectDescription: '',
            imgDescription: '',
            projectGoal: 0,
            currency: '',
            packages: [{ name: '', image: '', price: 0 }],
            roadmap: [{ title: '', description: '', deliveryDate: null, status: '' }],
            endDate: null,
            imageLogo: null,
          }}
          validationSchema={ProjectSubmissionFormSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                {/* Form fields */}
                <Grid item xs={12}>
                  <TextField
                    name="projectName"
                    label="Project Name"
                    fullWidth
                    variant="outlined"
                    value={values.projectName}
                    onChange={handleChange}
                    error={touched.projectName && Boolean(errors.projectName)}
                    helperText={touched.projectName && errors.projectName}
                  />
                </Grid>
                {/* File input for Image Logo */}
                <Grid item xs={12}>
                  <input
                    id="imageLogo"
                    name="imageLogo"
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                      setFile(file);
                    }}
                  />
                  {errors.imageLogo && <Typography color="error">{errors.imageLogo}</Typography>}
                </Grid>
                {/* Dynamic field array for packages */}
                <FieldArray
                  name="packages"
                  render={arrayHelpers => (
                    <Grid item xs={12}>
                      <Typography variant="h6">Packages</Typography>
                      {values.packages.map((packageItem, index) => (
                        <div key={index}>
                          <TextField
                            name={`packages.${index}.name`}
                            label="Package Name"
                            value={packageItem.name}
                            onChange={handleChange}
                            style={{ marginRight: '10px' }}
                          />
                          <TextField
                            name={`packages.${index}.image`}
                            label="Image URL"
                            value={packageItem.image}
                            onChange={handleChange}
                            style={{ marginRight: '10px' }}
                          />
                          <TextField
                            name={`packages.${index}.price`}
                            label="Price"
                            type="number"
                            value={packageItem.price}
                            onChange={handleChange}
                          />
                          <IconButton onClick={() => arrayHelpers.remove(index)}>
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                          <IconButton onClick={() => arrayHelpers.insert(index + 1, { name: '', image: '', price: 0 })}>
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </div>
                      ))}
                    </Grid>
                  )}
                />
                {/* Dynamic field array for roadmap */}
                <FieldArray
                  name="roadmap"
                  render={arrayHelpers => (
                    <Grid item xs={12}>
                      <Typography variant="h6">Roadmap</Typography>
                      {values.roadmap.map((roadmapItem, index) => (
                        <div key={index}>
                          <TextField
                            name={`roadmap.${index}.title`}
                            label="Title"
                            value={roadmapItem.title}
                            onChange={handleChange}
                            style={{ marginRight: '10px' }}
                          />
                          <TextField
                            name={`roadmap.${index}.description`}
                            label="Description"
                            value={roadmapItem.description}
                            onChange={handleChange}
                            style={{ marginRight: '10px' }}
                          />
                          <Field
                            name={`roadmap.${index}.deliveryDate`}
                            label="Delivery Date"
                            component={({ field }: { field: FieldProps['field'] }) => (
                              <DatePicker
                                {...field}
                                onChange={value => setFieldValue(`roadmap.${index}.deliveryDate`, value)}
                              />
                            )}
                          />
                          <IconButton onClick={() => arrayHelpers.remove(index)}>
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                          <IconButton onClick={() => arrayHelpers.insert(index + 1, { title: '', description: '', deliveryDate: null, status: '' })}>
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </div>
                      ))}
                    </Grid>
                  )}
                />
              </Grid>
              <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </LocalizationProvider>
      <Snackbar open={snackbarOpen} autoHideDuration={6000}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProjectSubmissionForm;