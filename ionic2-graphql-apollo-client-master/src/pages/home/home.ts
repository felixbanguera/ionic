import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';


const AllCompanies = gql`
  query AllCompanies {
    allCompanies {
      id
      name
    }
  }
`;

const AllUsersWithCompany = gql`
  query AllUsers {
    allUsers {
      id
      name
      company {
        id
        name
      }
    }
  }
`;


const allUsers = gql`
  query allUsers {
    allUsers {
      id
      name
      email
    }
  }
`;


const createUser = gql`
  mutation createUser($name:String!, $email:String!, $password:String!) {
    createUser(name: $name, authProvider: {email: {email: $email, password: $password}}) {
      id
      name
      email
    }
  }
`;

const deleteUser = gql`
  mutation deleteUser( $id : String! ) {
    deleteUser(id:$id) {
      id
    }
  }
`;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  title = 'app';
  model: any = {};
  allUsers: ApolloQueryObservable<any>;
  allCompanies: ApolloQueryObservable<any>;
  defaultCompany = {
    id : null,
    name : 'Pick Company'
  }

  constructor(public navCtrl: NavController, private apollo: Apollo) {

  }

  ngOnInit() {
    this.allUsers = this
      .apollo
      .watchQuery({ query: allUsers });

    // get all the companies for the input form

    // this.allCompanies = this
    //   .apollo
    //   .watchQuery({ query: AllCompanies });
  }


  deleteUser(_id) {
    console.log("Deleteting user with ID:"+_id);

    this.apollo.mutate({
      mutation: deleteUser,
      variables: { id: _id },


      // this will provide an update of the main AllUsers
      // query so the list gets updated...
      updateQueries: {
        allUsers: (prev, { mutationResult }) => {
          const deletedUser = mutationResult.data.deleteUser;
          const prevAllUsers = prev.allUsers;

          return {
            allUsers: prevAllUsers.filter((u) => { return u.id !== deletedUser.id })
          };
        },
      },
    }).subscribe(({ data }) => {
      console.log('got data: deleted user', data);

    }, (error) => {
      console.error('there was an error sending the query', error);
    });
  }


  createUserClicked(_formValue) {
    console.log(_formValue);

    let params = Object.assign(_formValue, {});

    this.apollo.mutate({
      mutation: createUser,
      variables: params,

      // this will provide an update of the main AllUsers
      // query so the list gets updated...
      updateQueries: {
        allUsers: (prev, { mutationResult }) => {
          const newUser = mutationResult.data.createUser;
          const prevAllUsers = prev.allUsers;

          return {
            allUsers: [...prevAllUsers, newUser]
          };
        },
      },
    }).subscribe(({ data }) => {
      console.log('got data', data);

    }, (error) => {
      console.error('there was an error sending the query', error);
    });
  }
}

