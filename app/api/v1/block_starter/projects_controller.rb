module Api
  module V1
    module BlockStarter
      class ProjectsController < ApplicationController
        skip_before_action :verify_authenticity_token
        before_action :set_project, only: [:show, :update, :destroy]

        def create
          @project = Project.new(project_params)
          if @project.save
            Rails.logger.info "Project created successfully with ID: #{@project.id}"
            render json: @project, status: :created
          else
            Rails.logger.error "Error creating project: #{@project.errors.full_messages.to_sentence}"
            render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def show
          render json: @project
        end

        def update
          if @project.update(project_params)
            Rails.logger.info "Project with ID: #{@project.id} updated successfully"
            render json: @project
          else
            Rails.logger.error "Error updating project: #{@project.errors.full_messages.to_sentence}"
            render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          @project.destroy
          Rails.logger.info "Project with ID: #{@project.id} deleted successfully"
          head :no_content
        end

        private

        def set_project
          @project = Project.find(params[:id])
        rescue ActiveRecord::RecordNotFound => e
          Rails.logger.error "Project not found: #{e.message}"
          render json: { error: "Project not found" }, status: :not_found
        end

        def project_params
          params.require(:project).permit(:project_name, :owner_name, :owner_telegram, :owner_email, :image_logo, :project_description, :img_description, :project_goal, :currency, :packages, :roadmap, :end_date)
        end
      end
    end
  end
end