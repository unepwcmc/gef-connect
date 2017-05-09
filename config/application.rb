require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GefConnect
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Browserify
    config.browserify_rails.node_env = "production"
    config.browserify_rails.commandline_options = "-t [ babelify --presets [es2015] --extensions .es6 ] -t [ envify purge --NODE_ENV production ]"
  end
end