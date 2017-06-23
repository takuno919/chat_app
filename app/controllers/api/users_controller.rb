module Api
  class UsersController < ApplicationController

    def index
      @users = User.all
      render json: @users
    end

    def search
      term = params[:term]
      @users = User.where('name like ?', "%#{term}%")
      render json: @users
    end

  end
end
