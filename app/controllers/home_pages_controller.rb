class HomePagesController < ApplicationController
  def home
    @lists = current_user.workspaces.first&.lists || List.none
  end
end
