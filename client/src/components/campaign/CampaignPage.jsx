// import { values } from "lodash";
import * as React from "react";
import { stringify } from "querystring";
import { Link } from "react-router-dom";

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
    TopToolbar,
    ReferenceManyField,
    EditButton,
} from "react-admin";
import { getImageSrc } from "../../utils";
import { Box, Button, FormHelperText, Typography } from "@material-ui/core";

const handleImage = (src) => {
    var iframe =
        "<iframe width='100%' height='100%' src='" + src + "'></iframe>";
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
};

const CusImageField = (props) => {
    const record = useRecordContext(props);
    // console.log(props.width);
    const src = getImageSrc(record.document);
    // const strSrc = handleImage(src);
    return (
        <>
            <FormHelperText>{props.label}</FormHelperText>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={() => handleImage(src)}>
                <img width={`${props.width}px`} src={src} alt="No Cover" />
            </a>
        </>
    );
};

CusImageField.defaultProps = {
    width: 100,
    label: "",
};

const SortByViews = () => (
    <Button
        color="primary"
        component={Link}
        to={{
            pathname: "/campaigns",
            search: stringify({
                page: 1,
                perPage: 10,
                sort: "isVerified:ASC,isVerifyDocument:ASC,createdAt:DESC,expiresAt",
                order: "DESC",
                filter: {},
            }),
        }}
    >
        Sort by non-verified
    </Button>
);

const PostEditActions = ({ basePath, record, resource }) => (
    <TopToolbar>
        <SortByViews />
    </TopToolbar>
);

export const CampaignList = (props) => (
    <List
        {...props}
        actions={<PostEditActions />}
        sort={{
            field: "isVerified:ASC,isVerifyDocument:ASC,createdAt:DESC,expiresAt",
            order: "DESC",
        }}
    >
        <Datagrid rowClick="edit">
            {/* <TextField source="document.data.type" /> */}

            <TextField source="name" />
            <CusImageField source="document" />
            <BooleanField source="isVerified" label="verified?" />
            <BooleanField
                source="isVerifyDocument"
                label="Need Document Verification?"
            />
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
            <DateField source="updatedAt" label="Updated On" />
            <DateField source="createdAt" label="Created On" />
            {/* <TextField source="id" /> */}
        </Datagrid>
    </List>
);
const PostTitle = ({ record }) => {
    return <span>Campaign Name: {record ? `"${record.name}"` : ""}</span>;
};

export const CampaignEdit = (props) => (
    <Edit {...props} title={<PostTitle />} /*aside={<Aside props={props} />}*/>
        <SimpleForm>
            <TextField source="id" label="Campaign id" />
            <CusImageField source="document" width={300} label="Cover Image" />
            <TextInput source="name" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <BooleanInput source="isVerified" />
            <BooleanInput source="isVerifyDocument" />
            <DateInput source="expiresAt" />
            <TextInput multiline source="description" />
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
            <TextInput source="remark" />
            <Box mt={3}>
                <Typography variant="h6">Campaign Proofs</Typography>
                <ReferenceManyField
                    label="Proofs"
                    target="campaignId"
                    reference="campaignproofs"
                >
                    <Datagrid>
                        <EditButton />
                        <BooleanField source="isChecked" label="Checked?" />
                        <CusImageField source="document" width={300} />
                        <TextField source="id" />
                    </Datagrid>
                </ReferenceManyField>
            </Box>
            <DateField source="updatedAt" label="Updated On" />
            <DateField source="createdAt" label="Created On" />
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
