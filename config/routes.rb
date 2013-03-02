SiteMc::Application.routes.draw do
    root :to => "results#new"

    get "results/get_terminals"

    resources :results, :only => [ :index, :get_terminals, :show, :new, :create ]

    get "pages/success"
    get "pages/statistic"
end
