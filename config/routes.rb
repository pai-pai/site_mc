SiteMc::Application.routes.draw do
    root :to => "results#new"

    get "results/get_terminals"

    resources :results, :only => [ :index, :get_terminals, :show, :new, :create ]
    resources :orgs, :only => [ :index, :show ]

    get "pages/success"
    get "pages/statistic"

    match "success" => "pages#success"
    match "statistic" => "pages#statistic"
end
