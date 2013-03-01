SiteMc::Application.routes.draw do
    root :to => "results#new" 

    resources :results, :only => [ :index, :show, :new, :create ]
    
    get "pages/success"
    get "pages/statistic"
end
