/* eslint-disable no-unused-vars */
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
    Show,
    TabbedShowLayout,
    Tab,
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
                order: "ASC",
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
    return <span>Campaign ID: {record ? `"${record.id}"` : ""}</span>;
};

// const Aside = () => {
//     const record = useRecordContext();
//     return (
//         <div style={{ width: 200, margin: "1em" }}>
//             <Typography variant="h6">Campaign Reporting</Typography>
//             {record && (
//                 <ReferenceManyField
//                     label="Proofs"
//                     target="campaignId"
//                     reference="campaignreportings"
//                 >
//                     <Datagrid>
//                         <BooleanField source="isChecked" label="Checked?" />
//                         <TextField multiline source="message" />
//                         <EditButton />
//                     </Datagrid>
//                 </ReferenceManyField>
//             )}
//         </div>
//     );
// };

export const CampaignShow = (props) => (
    <Show {...props} title={<PostTitle />}>
        <TabbedShowLayout>
            <Tab label="Campaign">
                <TextField source="name" className={{ width: "100px" }} />
                <CusImageField
                    source="document"
                    label="Cover Image"
                    width="500"
                />
                <BooleanField source="isVerified" label="Verified?" />
                <BooleanField
                    source="isVerifyDocument"
                    label="Need More Proofs?"
                />
                <NumberField source="limit.$numberDecimal" label="Limit" />
                <DateField source="expiresAt" label="Expires" />
                <ReferenceField source="categoryId" reference="categories">
                    <TextField source="name" label="category" />
                </ReferenceField>
                <ReferenceField
                    source="userId"
                    reference="users"
                    linkType="show"
                >
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="remarks" />
            </Tab>
            <Tab label="Proofs" path="campaignproofs">
                <ReferenceManyField
                    // label="Proofs"
                    target="campaignId"
                    reference="campaignproofs"
                    addLabel={false}
                >
                    <Datagrid>
                        <CusImageField source="document" width={300} />
                        <BooleanField source="isChecked" label="Checked?" />
                        <TextField source="id" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="Comments" path="campaigncomments">
                <ReferenceManyField
                    // label="Proofs"
                    target="campaignId"
                    reference="campaigncomments"
                    addLabel={false}
                >
                    <Datagrid>
                        <TextField multiline source="comment" />
                        <ReferenceField
                            source="userId"
                            reference="users"
                            linkType="show"
                        >
                            <TextField source="name" />
                        </ReferenceField>
                        {/* <EditButton /> */}
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="Donations" path="campaigndonations">
                <ReferenceManyField
                    // label="Proofs"
                    target="campaignId"
                    reference="campaigndonations"
                    addLabel={false}
                >
                    <Datagrid>
                        <ReferenceField
                            source="userId"
                            reference="users"
                            linkType="show"
                        >
                            <TextField source="name" />
                        </ReferenceField>
                        <NumberField source="amount" />
                        {/* <EditButton /> */}
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="Reportings" path="campaignreportings">
                <ReferenceManyField
                    label="Proofs"
                    target="campaignId"
                    reference="campaignreportings"
                    addLabel={false}
                >
                    <Datagrid>
                        <BooleanField source="isChecked" label="Checked?" />
                        <TextField multiline source="message" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const CampaignList = (props) => (
    <List
        {...props}
        sort={{
            field: "expiresAt:DESC,createdAt",
            order: "DESC",
        }}
        perPage={5}
        actions={<ListActions />}
    >
        <Datagrid rowClick="show">
            {/* <TextField source="document.data.type" /> */}

            <TextField source="name" className={{ width: "100px" }} />
            <CusImageField source="document" />
            <BooleanField source="isVerified" label="Verified?" />
            <BooleanField source="isVerifyDocument" label="Need More Proofs?" />
            <NumberField source="limit.$numberDecimal" label="Limit" />
            <DateField source="expiresAt" label="Expires" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" label="category" />
            </ReferenceField>
            <ReferenceField source="userId" reference="users" linkType="show">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
);

export const CampaignEdit = (props) => (
    <Edit {...props} title={<PostTitle />} /*aside={<Aside />}*/>
        <SimpleForm>
            <TextField source="id" label="Campaign id" />
            <CusImageField source="document" width={300} label="Cover Image" />
            <TextInput source="name" />
            <ReferenceField source="userId" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <BooleanInput source="isVerified" label="Verified?" />
            <BooleanInput
                source="isVerifyDocument"
                label="Need Document submission?"
            />
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
            <TextInput multiline source="remarks" />
            <Box mt={3}>
                <Typography variant="h6">Campaign Proofs</Typography>
                <ReferenceManyField
                    label="Proofs"
                    target="campaignId"
                    reference="campaignproofs"
                >
                    <Datagrid>
                        <CusImageField source="document" width={300} />
                        <BooleanField source="isChecked" label="Checked?" />
                        <TextField source="id" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Box>
            <DateField source="updatedAt" label="Updated On" />
            <DateField source="createdAt" label="Created On" />
        </SimpleForm>
    </Edit>
);
