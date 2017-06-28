module Api
  class UsersController < ApplicationController

    def index
      @users = current_user.friends_of_from_user + current_user.friends_of_to_user
      render json: @users
    end

    def search
      term = params[:term]
      # params[:term] ||= ""
      if term.empty?
        @users = nil
        render json: @users
      else
        @users = User.where('name like ?', "#{term}%").where.not(id:[current_user.id, current_user.friends_of_from_user_ids])
        render json: @users
      end
    end

  end
end
