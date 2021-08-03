import * as React from "react";
//, ListGuesser, EditGuesser
import { Admin, Resource } from "react-admin";
import {
    UserList,
    UserEdit,
    UserCreate,
    UserShow,
} from "./components/user/UserPage";
import { CampaignList, CampaignEdit } from "./components/campaign/CampaignPage";
import {
    CategoryList,
    CategoryEdit,
    CategoryCreate,
} from "./components/category/CategoryPage";
import authProvider from "./providers/authProvider";
import appProvider from "./providers/appProvider";

import Dashboard from "./components/Dashboard";
import UserIcon from "@material-ui/icons/Group";
import LoginPage from "./components/Login";
import CategoryIcon from "@material-ui/icons/Category";
import { ProofEdit } from "./components/campaign/Proof";

const App = () => (
    <Admin
        loginPage={LoginPage}
        authProvider={authProvider}
        dashboard={Dashboard}
        dataProvider={appProvider}
    >
        <Resource
            name="users"
            show={UserShow}
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            icon={UserIcon}
        />
        <Resource
            name="categories"
            list={CategoryList}
            edit={CategoryEdit}
            create={CategoryCreate}
            icon={CategoryIcon}
        />
        <Resource
            name="campaigns"
            list={CampaignList}
            edit={CampaignEdit}
            // create={CategoryCreate}
            // icon={CategoryIcon}
        />
        <Resource name="campaignproofs" edit={ProofEdit} />
    </Admin>
);

export default App;
