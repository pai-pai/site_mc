require 'spec_helper'

describe PagesController do

  describe "GET 'success'" do
    it "returns http success" do
      get 'success'
      response.should be_success
    end
  end

  describe "GET 'statistic'" do
    it "returns http success" do
      get 'statistic'
      response.should be_success
    end
  end

end
