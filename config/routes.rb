SiteMc::Application.routes.draw do
    root :to => "results#new"

    get "results/get_terminals"

    resources :results, :only => [ :index, :get_terminals, :show, :new, :create ]
    resources :orgs, :only => [ :index, :show ]

    get "pages/success"
    get "pages/statistic"
    get "pages/date_report"
    get "pages/total"
    get "pages/get_comments"
    get "pages/print"

    get "pages/get_start_val"

    match "success" => "pages#success"
    match "statistic-miac" => "pages#statistic"
    match "total" => "pages#total"
    match "print-records" => "pages#print", :as => :print_records
end
