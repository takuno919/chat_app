module Api
  class MessagesController < ApplicationController
    def index
      @messages = Message.where(from: current_user.id, to: params[:to]) + Message.where(from: params[:to], to: current_user.id)
      render json: @messages
    end

    def create
      @message = Message.create(from: current_user.id, to: params[:to], content: params[:content])
      render json: @message
    end
  end
end
