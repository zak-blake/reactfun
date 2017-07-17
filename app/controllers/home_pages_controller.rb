class HomePagesController < ApplicationController
  def home
    @lists = current_user.lists
  end
end
