SiteMc::Application.routes.draw do
    root :to => "results#new"

    get "results/get_terminals"
    get "results/get_last_result"

    resources :results, :only => [ :index, :get_terminals, :get_last_result, :show, :new, :create ]
    resources :orgs, :only => [ :index, :show ]
    resources :users
    resources :sessions, :only => [ :new, :create, :destroy ]

    get "pages/success"
    get "pages/statistic"
    get "pages/date_report"
    get "pages/total"
    get "pages/get_comments"
    get "pages/print"
    get "pages/dashboard"
    get "pages/calendar"
    match "calendar" => "pages#calendar"

    get "pages/get_start_val"

    match "success" => "pages#success"
    match "statistic" => "pages#statistic"
    match "dashboard" => "pages#dashboard"
    match "dashboard/date_report" => "pages#date_report", :as => :date_report
    match "total" => "pages#total"
    match "print-records" => "pages#print", :as => :print_records

    match "adding-user" => "users#new", :as => :sign_up

    match "login" => "sessions#new"
    match "logout" => "sessions#destroy", :via => :delete
end
