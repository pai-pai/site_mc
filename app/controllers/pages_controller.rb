class PagesController < ApplicationController
  def success
  end

  def statistic
    @orgs = Org.all
  end
end
