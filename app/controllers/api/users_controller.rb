module Api
  class UsersController < ApplicationController

    def index
      @users = User.all
      render json: @users
    end

    def search
    end

  end
end
