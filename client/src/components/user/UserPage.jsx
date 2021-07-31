// import { values } from "lodash";
import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    BooleanField,
    DateField,
    NumberField,
    ReferenceField,
    SimpleForm,
    Edit,
    TextInput,
    BooleanInput,
    NumberInput,
    Create,
    SelectInput,
    Show,
    SimpleShowLayout,
} from "react-admin";
// import MyUrlField from "./MyUrlField";

const editValidate = (values) => {
    const errors = {};
    if (values.rating) {
        if (values.rating < 0 || values.rating > 10)
            errors.rating = "rating must be in between 0 to 10";
    }

    return errors;
};

const roles = [
    { id: "ADMIN", name: "ADMIN" },
    { id: "CAMPAIGNER", name: "CAMPAIGNER" },
    { id: "DONOR", name: "DONOR" },
];
// const Aside = () => (
//     <div style={{ width: 200, margin: "1em" }}>
//         <Typography variant="h6">Post details</Typography>
//         <Typography variant="body2">
//             Posts will only be published once an editor approves them
//         </Typography>
//     </div>
// );
export const UserShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <DateField source="name" />
            <TextField source="role" />
            <BooleanField source="isEmailVerified" />
            <BooleanField source="isActive" />
            <NumberField source="rating" />
            <EmailField source="email" />
            <ReferenceField source="updatedBy" reference="users">
                <TextField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);

export const UserList = (props) => (
    <List {...props} title="Users List">
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="role" />
            <BooleanField source="isEmailVerified" />
            <BooleanField source="isActive" />
            <NumberField source="rating" />
            <EmailField source="email" />
            <ReferenceField source="updatedBy" reference="users">
                <TextField source="name" />
            </ReferenceField>
            {/* <TextField source="updatedBy" /> */}
            {/* <TextField source="id" /> */}
        </Datagrid>
    </List>
);

export const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm validate={editValidate}>
            <TextInput source="role" />
            <BooleanInput source="isEmailVerified" />
            <BooleanInput source="isActive" />
            <NumberInput source="rating" />
            <TextInput source="name" />
            <TextInput source="email" />
            {/* <TextInput source="updatedBy" /> */}
            {/* <TextInput source="id" /> */}
        </SimpleForm>
    </Edit>
);

export const UserCreate = (props) => (
    <Create {...props} validate={editValidate}>
        <SimpleForm validate={editValidate}>
            <SelectInput source="role" choices={roles} />
            {/* <BooleanInput source="isEmailVerified" />
            <BooleanInput source="isActive" /> */}
            {/* <NumberInput source="rating" /> */}
            <TextInput source="name" />
            <TextInput source="email" autoComplete="false" />
            <TextInput
                type="password"
                source="password"
                initialValue="Passw0rd"
            />
            {/* <TextInput source="updatedBy" /> */}
            {/* <TextInput source="id" /> */}
        </SimpleForm>
    </Create>
);
