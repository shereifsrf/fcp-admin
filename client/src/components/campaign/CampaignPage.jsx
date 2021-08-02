// import { values } from "lodash";
import * as React from "react";
import PropTypes from "prop-types";

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
import { FormHelperText } from "@material-ui/core";
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
    // console.log(props.width);
    const src = getImageSrc(record.document);
    return (
        <>
            <FormHelperText>{props.label}</FormHelperText>
            <img width={`${props.width}px`} src={src} alt="No Cover" />{" "}
        </>
    );
};

CusImageField.defaultProps = {
    width: 100,
    label: "",
};

export const CampaignList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            {/* <TextField source="document.data.type" /> */}

            <CusImageField source="document" />
            <TextField source="name" />
            <BooleanField source="isVerified" />
            <BooleanField source="isVerifyDocument" />
            <NumberField source="limit.$numberDecimal" label="Limit" />
            <DateField source="expiresAt" label="Expires" />
            <TextField source="description" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" label="category" />
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
            <TextField source="id" label="Campaign id" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <CusImageField source="document" width={300} label="Cover Image" />
            <BooleanInput source="isVerified" />
            <DateInput source="expiresAt" />
            <BooleanInput source="isVerifyDocument" />
            <TextInput source="name" />
            <TextInput source="description" />
            <NumberInput source="limit.$numberDecimal" label="Limit" />
            <ReferenceInput source="categoryId" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceField source="createdBy" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="updatedBy" reference="users">
                <TextField source="name" />
            </ReferenceField>
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
