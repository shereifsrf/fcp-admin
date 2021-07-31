// import { values } from "lodash";
import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    DateField,
    NumberField,
    ReferenceField,
    SimpleForm,
    Edit,
    TextInput,
    BooleanInput,
    NumberInput,
    SelectInput,
    DateInput,
    ReferenceInput,
    useRecordContext,
} from "react-admin";
import { getImageSrc } from "../../utils";
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
const CusImageField = (props) => {
    const record = useRecordContext(props);
    // console.log(record.document);
    const src = getImageSrc(record.document);
    return <img src={src} alt="No Cover" />;
};

export const CampaignList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            {/* <TextField source="document.data.type" /> */}

            <CusImageField source="document" />
            <BooleanField source="isVerified" />
            <DateField source="expiresAt" />
            <BooleanField source="isVerifyDocument" />
            <TextField source="name" />
            <TextField source="description" />
            <NumberField source="limit.$numberDecimal" label="Limit" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="updatedBy" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="createdBy" reference="users">
                <TextField source="name" />
            </ReferenceField>
            {/* <TextField source="id" /> */}
        </Datagrid>
    </List>
);

export const CampaignEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <CusImageField source="document" />
            <BooleanInput source="isVerified" />
            <DateInput source="expiresAt" />
            <BooleanInput source="isVerifyDocument" />
            <TextInput source="name" />
            <TextInput source="description" />
            <NumberInput source="limit.$numberDecimal" label="Limit" />
            <ReferenceInput source="categoryId" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="id" />
            <TextInput source="createdBy" />
            <TextInput source="updatedBy" />
            <TextInput source="id" />
        </SimpleForm>
    </Edit>
);

// export const CategoryCreate = (props) => (
//     <Create {...props}>
//         <SimpleForm>
//             <TextInput source="name" />
//             <TextInput source="description" />
//             {/* <TextInput source="createdBy" /> */}
//             {/* <TextInput source="updatedBy" /> */}
//             {/* <TextInput source="id" /> */}
//         </SimpleForm>
//     </Create>
// );
