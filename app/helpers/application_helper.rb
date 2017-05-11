module ApplicationHelper
  def active_link_to(text, path, options={})
    options[:class] ||= ""
    options[:class] << " active" if current_page?(path)

    link_to(text, path, options)
  end

  def file_extension_for(file)
    File.extname(file.url).gsub(".", "").upcase
  end

  def file_name_for(file)
    File.basename(file.original_filename, File.extname(file.url)).titleize
  end

  def file_size_for(file, decimal_places=2)
    format = file.size < 1_000_000 ? :kb : :mb

    case format
    when :kb
      size = file.size.to_f / 1024
    when :mb
      size = file.size.to_f / 1024 / 1024
    end

    size.round(decimal_places).to_s + format.to_s
  end

  def format_url_safe(text)
    ERB::Util.url_encode(text)
  end

  def any_fields_present(type, total=5)
    file_fields_present = -> (n) { cms_block_content("file_#{n}".to_sym).try(:file)&.present? }
    url_fields_present = -> (n) { cms_block_content("url_#{n}".to_sym)&.present? }
    any_data_for_field = type == 'file' ? file_fields_present : url_fields_present
    
    (1..total).any? { |n| any_data_for_field[n] }
  end
end

