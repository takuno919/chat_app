module Api
  class FriendshipsController < ApplicationController
    def create
      Friendship.create(from_user_id: current_user.id, to_user_id: params[:user_id])
      render json: @friendships
    end

    def destroy
      friendship = Friendship.find_by(from_user_id: current_user.id, to_user_id: params[:user_id]) || Friendship.find_by(from_user_id: params[:user_id], to_user_id: current_user.id)
      friendship.destroy
      render json: @friendships
    end
  end
end
