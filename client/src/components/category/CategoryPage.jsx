// import { values } from "lodash";
import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    SimpleForm,
    Edit,
    TextInput,
    Create,
} from "react-admin";
// import MyUrlField from "./MyUrlField";

// const editValidate = (values) => {
//     const errors = {};
//     if (values.rating) {
//         if (values.rating < 0 || values.rating > 10)
//             errors.rating = "rating must be in between 0 to 10";
//     }

//     return errors;
// };

// const roles = [
//     { id: "ADMIN", name: "ADMIN" },
//     { id: "CAMPAIGNER", name: "CAMPAIGNER" },
//     { id: "DONOR", name: "DONOR" },
// ];

export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="description" />
            <ReferenceField source="createdBy" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="updatedBy" reference="users">
                <TextField source="name" />
            </ReferenceField>
            {/* <TextField source="id" /> */}
        </Datagrid>
    </List>
);

export const CategoryEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
            {/* <TextInput source="createdBy" /> */}
            {/* <TextInput source="updatedBy" /> */}
            {/* <TextInput source="id" /> */}
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
            {/* <TextInput source="createdBy" /> */}
            {/* <TextInput source="updatedBy" /> */}
            {/* <TextInput source="id" /> */}
        </SimpleForm>
    </Create>
);

// export const CategoryEdit = (props) => (
//     <Edit {...props}>
//         <SimpleForm validate={editValidate}>
//             <TextInput source="role" />
//             <BooleanInput source="isEmailVerified" />
//             <BooleanInput source="isActive" />
//             <NumberInput source="rating" />
//             <TextInput source="name" />
//             <TextInput source="email" />
//             {/* <TextInput source="updatedBy" /> */}
//             {/* <TextInput source="id" /> */}
//         </SimpleForm>
//     </Edit>
// );

// export const CategoryCreate = (props) => (
//     <Create {...props} validate={editValidate}>
//         <SimpleForm validate={editValidate}>
//             <SelectInput source="role" choices={roles} />
//             {/* <BooleanInput source="isEmailVerified" />
//             <BooleanInput source="isActive" /> */}
//             {/* <NumberInput source="rating" /> */}
//             <TextInput source="name" />
//             <TextInput source="email" autoComplete="false" />
//             <TextInput
//                 type="password"
//                 source="password"
//                 initialValue="Passw0rd"
//             />
//             {/* <TextInput source="updatedBy" /> */}
//             {/* <TextInput source="id" /> */}
//         </SimpleForm>
//     </Create>
// );
