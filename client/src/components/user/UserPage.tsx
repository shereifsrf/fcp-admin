// import { values } from "lodash";
import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    BooleanField,
    ReferenceField,
    SimpleForm,
    Edit,
    TextInput,
    BooleanInput,
    Create,
    Show,
    SimpleShowLayout,
    useNotify,
    SelectInput,
    PasswordInput,
    TopToolbar,
    EditButton,
} from "react-admin";

const restrictedRoles = ["ADMIN", "MASTER"];
const isEditable = (record: any, permissions: string) => {
    if (permissions === "MASTER" && record.role !== "MASTER") {
        return true;
    } else {
        return !restrictedRoles.includes(record.role);
    }
};

const editValidate = (values: any) => {
    const errors: any = {};
    if (values.rating) {
        if (values.rating < 0 || values.rating > 10)
            errors.rating = "rating must be in between 0 to 10";
    }

    return errors;
};

const rolesM = [
    // { id: "MASTER", name: "MASTER" },
    { id: "ADMIN", name: "ADMIN" },
    { id: "CAMPAIGNER", name: "CAMPAIGNER" },
    { id: "DONOR", name: "DONOR" },
];

const rolesA = [
    { id: "CAMPAIGNER", name: "CAMPAIGNER" },
    { id: "DONOR", name: "DONOR" },
];

const ShowActions = ({ data, basePath, permissions }: any) => {
    return (
        <TopToolbar>
            {data && isEditable(data, permissions) && (
                <EditButton basePath={basePath} record={data} />
            )}
        </TopToolbar>
    );
};

export const UserShow = ({ permissions, ...props }: any) => (
    <Show {...props} actions={<ShowActions permissions={permissions} />}>
        <SimpleShowLayout>
            {/* <TextField source="id" /> */}
            <TextField source="name" />
            <TextField source="role" />
            <BooleanField source="isEmailVerified" />
            <BooleanField source="isActive" />
            {/* <NumberField source="rating" /> */}
            <EmailField source="email" />
            <ReferenceField source="updatedBy" reference="users" link={false}>
                <TextField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);

export const UserList = ({ permissions, ...props }: any) => (
    <List
        {...props}
        title="Users List"
        sort={{
            field: "createdAt:DESC,isActive:",
            order: "DESC",
        }}
    >
        <Datagrid
            rowClick="show"
            isRowSelectable={(record) => isEditable(record, permissions)}
        >
            <TextField source="name" />
            <TextField source="role" />
            <BooleanField source="isEmailVerified" />
            <BooleanField source="isActive" />
            {/* <NumberField source="rating" /> */}
            <EmailField source="email" />
            <ReferenceField source="updatedBy" reference="users" link={false}>
                <TextField source="name" />
            </ReferenceField>
            {/* <TextField source="updatedBy" /> */}
            {/* <TextField source="id" /> */}
        </Datagrid>
    </List>
);

export const UserEdit = ({ permissions, ...props }: any) => {
    const notify = useNotify();

    const onFailure = () => {
        notify(`Could not edit user`);
    };
    return (
        <Edit {...props} onFailure={onFailure}>
            <SimpleForm validate={editValidate}>
                <TextInput source="name" />
                <TextInput source="email" />
                {permissions === "ADMIN" && (
                    <SelectInput source="role" choices={rolesA} />
                )}
                {permissions === "MASTER" && (
                    <SelectInput source="role" choices={rolesM} />
                )}
                <BooleanInput source="isEmailVerified" />
                <BooleanInput source="isActive" />
                <TextInput source="password" />
                {/* <NumberInput source="rating" /> */}
                {/* <TextInput source="updatedBy" /> */}
                {/* <TextInput source="id" /> */}
            </SimpleForm>
        </Edit>
    );
};

export const UserCreate = ({ permissions, ...props }: any) => (
    <Create {...props} validate={editValidate}>
        <SimpleForm validate={editValidate}>
            {permissions === "ADMIN" && (
                <SelectInput source="role" choices={rolesA} />
            )}
            {permissions === "MASTER" && (
                <SelectInput source="role" choices={rolesM} />
            )}
            <TextInput source="name" />
            <TextInput source="email" autoComplete="false" />
            <PasswordInput source="password" initialValue="Passw0rd" />
            {/* <TextInput source="updatedBy" /> */}
            {/* <TextInput source="id" /> */}
        </SimpleForm>
    </Create>
);
