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
    ExportButton,
} from "react-admin";
import { getImageSrc } from "../../utils";
import { Box, Button, FormHelperText, Typography } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

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

const SortByToVerify = () => (
    <Button
        color="primary"
        component={Link}
        to={{
            pathname: "/campaigns",
            search: stringify({
                filter: JSON.stringify({
                    expiresAt: { $gte: new Date(Date.now()).toISOString() },
                    isVerified: false,
                }),
                page: 1,
                perPage: 5,
                sort: "isVerified:ASC,isVerifyDocument:ASC,expiresAt",
                order: "DESC",
            }),
        }}
    >
        <FormatListNumberedIcon /> To -verify
    </Button>
);

const SortByExpired = () => (
    <Button
        color="primary"
        component={Link}
        to={{
            pathname: "/campaigns",
            search: stringify({
                page: 1,
                perPage: 5,
                sort: "isVerified:ASC,isVerifyDocument:ASC,createdAt:DESC,expiresAt",
                order: "DESC",
                filter: JSON.stringify({
                    expiresAt: { $lt: new Date(Date.now()).toISOString() },
                }),
            }),
        }}
    >
        <ReportProblemIcon /> Expired
    </Button>
);

const SortByVerified = () => (
    <Button
        color="primary"
        component={Link}
        to={{
            pathname: "/campaigns",
            search: stringify({
                page: 1,
                perPage: 5,
                sort: "isVerified:ASC,isVerifyDocument:ASC,createdAt:DESC,expiresAt",
                order: "DESC",
                filter: JSON.stringify({
                    expiresAt: { $gte: new Date(Date.now()).toISOString() },
                    isVerified: true,
                }),
            }),
        }}
    >
        <VerifiedUserIcon /> Verified
    </Button>
);

const SortByDefault = () => (
    <Button
        color="primary"
        component={Link}
        to={{
            pathname: "/campaigns",
            search: stringify({
                page: 1,
                perPage: 5,
                sort: "isVerified:ASC,isVerifyDocument:ASC,createdAt:DESC,expiresAt",
                order: "DESC",
            }),
        }}
    >
        <BookmarkIcon /> Default
    </Button>
);

const ListActions = ({ basePath, record, resource }) => (
    <TopToolbar>
        <SortByDefault />
        <SortByToVerify />
        <SortByExpired />
        <SortByVerified />
        {/* <ExportButton /> */}
    </TopToolbar>
);

const PostTitle = ({ record }) => {
    return <span>Campaign Name: {record ? `"${record.name}"` : ""}</span>;
};

export const CampaignList = (props) => (
    <List
        {...props}
        sort={{
            field: "isVerified:ASC,isVerifyDocument:ASC,createdAt:DESC,expiresAt",
            order: "DESC",
        }}
        perPage={5}
        actions={<ListActions />}
    >
        <Datagrid rowClick="edit">
            {/* <TextField source="document.data.type" /> */}

            <TextField source="name" className={{ width: "100px" }} />
            <CusImageField source="document" />
            <BooleanField source="isVerified" label="Verified?" />
            <BooleanField
                source="isVerifyDocument"
                label="Document Submitted?"
            />
            <NumberField source="limit.$numberDecimal" label="Limit" />
            <DateField source="expiresAt" label="Expires" />
            {/* <TextField source="description" /> */}
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" label="category" />
            </ReferenceField>
            <ReferenceField source="userId" reference="users" linkType="show">
                <TextField source="name" />
            </ReferenceField>
            {/* <ReferenceField
                source="updatedBy"
                reference="users"
                linkType="show"
            >
                <TextField source="name" />
            </ReferenceField> */}
            {/* <ReferenceField
                source="createdBy"
                reference="users"
                linkType="show"
            >
                <TextField source="name" />
            </ReferenceField> */}
            {/* <DateField source="updatedAt" label="Updated On" />
            <DateField source="createdAt" label="Created On" /> */}
            {/* <TextField source="id" /> */}
        </Datagrid>
    </List>
);

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
