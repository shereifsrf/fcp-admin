// import { values } from "lodash";
import * as React from "react";

import {
    TextField,
    DateField,
    SimpleForm,
    Edit,
    BooleanInput,
    List,
    Datagrid,
    ReferenceField,
    TextInput,
    BooleanField,
} from "react-admin";

const PostTitle = ({ record }) => {
    return <span>Reporting id: {record ? `${record.id}` : ""}</span>;
};

export const ReportingEdit = (props) => {
    return (
        <Edit {...props} title={<PostTitle />}>
            <SimpleForm>
                {/* <TextField source="id" label="Reporting id" /> */}
                <BooleanInput source="isChecked" />
                <TextInput multiline source="message" />
                <DateField source="updatedAt" label="Updated On" />
                <DateField source="createdAt" label="Created On" />
            </SimpleForm>
        </Edit>
    );
};

export const CampaignReportingList = (props) => (
    <List
        {...props}
        sort={{
            field: "isChecked:ASC,createdAt",
            order: "DESC",
        }}
    >
        <Datagrid rowClick="edit">
            <BooleanField source="isChecked" />
            <ReferenceField
                source="campaignId"
                reference="campaigns"
                linkType="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <TextField source="message" />
            <ReferenceField source="userId" reference="users" linkType="show">
                <TextField source="name" />
            </ReferenceField>
            {/* <TextField source="createdBy" /> */}
            <DateField source="createdAt" />
            {/* <DateField source="updatedAt" /> */}
            {/* <TextField source="id" /> */}
        </Datagrid>
    </List>
);
