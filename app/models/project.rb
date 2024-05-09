class Project < ApplicationRecord
  # Validations
  validates :project_name, :owner_name, :owner_telegram, :owner_email, :project_description, :project_goal, :currency, :end_date, presence: true
  validates :owner_email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :project_goal, numericality: { only_integer: true, greater_than: 0 }

  # Ensure the JSONB fields can accept arrays of objects
  serialize :packages, Array
  serialize :roadmap, Array

  after_validation :log_errors, if: -> { errors.any? }

  private

  def log_errors
    Rails.logger.error "Validation failed for Project: #{errors.full_messages.join(", ")}"
  end
end