SiteMc::Application.routes.draw do
    root :to => "results#new"

    get "results/get_terminals"

    resources :results, :only => [ :index, :get_terminals, :show, :new, :create ]
    resources :orgs, :only => [ :index, :show ]

    get "pages/success"
    get "pages/statistic"
    get "pages/total"
    get "pages/stat_terminals"
    get "pages/stat_emk"
    get "pages/stat_register"
    get "pages/stat_docreg"
    get "pages/stat_infomat"
    get "pages/stat_infostand"
    get "pages/comments"
    get "pages/get_comments"
    get "pages/print"

    match "success" => "pages#success"
    match "statistic-miac" => "pages#statistic"
    match "total" => "pages#total"
    match "terminals" => "pages#stat_terminals"
    match "emk" => "pages#stat_emk"
    match "self-register" => "pages#stat_register", :as => :register
    match "doc-register" => "pages#stat_docreg", :as => :docreg
    match "infomats" => "pages#stat_infomat"
    match "info-stand" => "pages#stat_infostand", :as => :infostand
    match "comments" => "pages#comments"
    match "print-records" => "pages#print", :as => :print_records
end
