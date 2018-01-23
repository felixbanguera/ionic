# Ionic2 GraphQL Sample Application

This is a starter project for [Ionic 2](http://ionicframework.com/docs/) with [GraphQL](http://graphql.org/)

Based on [aaronksaunders](https://github.com/aaronksaunders)'s repository [https://github.com/aaronksaunders/ionic2-graphql-apollo-client](https://github.com/aaronksaunders/ionic2-graphql-apollo-client) but with modifications to be a pair of the example given by [Howtographql for Ruby](https://www.howtographql.com/graphql-ruby/0-introduction/)

## GraphQL Server
My server will be an Ruby on Rails + Graphl server, which uses the gem graphl-ruby.

You can find the project code in my [repository](https://github.com/felixbanguera/rails/tree/graphql/apps/graphql_tut)

to install `bundle install`

to run `rails server`

## Apollo Client Features according to [aaronksaunders](https://github.com/aaronksaunders)
- Application shows basic user queries and  mutations
- Controlling the store and UI [using updateQueries](http://dev.apollodata.com/angular2/cache-updates.html#updateQueries) as a more efficient way to update the user interface without requerying the data
