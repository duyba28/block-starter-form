class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :project_name, :owner_name, :owner_telegram, :owner_email, :image_logo, :project_description, :img_description, :project_goal, :currency, :packages, :roadmap, :end_date

  def packages
    object.packages.map do |package|
      {
        name: package['name'],
        image: package['image'],
        price: package['price']
      }
    rescue StandardError => e
      Rails.logger.error "Error serializing packages: #{e.message}\n#{e.backtrace.join("\n")}"
      []
    end
  end

  def roadmap
    object.roadmap.map do |roadmap_item|
      {
        title: roadmap_item['title'],
        description: roadmap_item['description'],
        delivery_date: roadmap_item['delivery_date'],
        status: roadmap_item['status']
      }
    rescue StandardError => e
      Rails.logger.error "Error serializing roadmap: #{e.message}\n#{e.backtrace.join("\n")}"
      []
    end
  end
end