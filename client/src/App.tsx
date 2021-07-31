import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./users";
import { PostList, PostEdit, PostCreate } from "./posts";
import authProvider from "./authProvider";
import MyProviders from "./MyProviders";

import Dashboard from "./Dashboard";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
    <Admin
        authProvider={authProvider}
        dashboard={Dashboard}
        dataProvider={MyProviders}
        // dataProvider={dataProvider}
    >
        <Resource name="categories" list={UserList} icon={UserIcon} />
        {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
        {/* <Resource
            name="posts"
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            icon={PostIcon}
        /> */}
        {/* <Resource name="categories" list={ListGuesser} /> */}
    </Admin>
);

export default App;
