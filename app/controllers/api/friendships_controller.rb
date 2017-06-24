module Api
  class FriendshipsController < ApplicationController

    def index
      @friendships = Friendship.all
      render json: @friendships
    end

    def create
      Friendship.create(from_user_id:current_user.id, to_user_id:params[:user_id])
      render json: @friendships
    end

    def destroy
      frendship = Friendship.find_by(from_user_id:current_user.id, to_user_id:params[:user_id])
      frendship.destroy
      render json: @friendships
    end
  end
end
