// import { values } from "lodash";
import { FormHelperText } from "@material-ui/core";
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
    BooleanField,
    useRecordContext,
    NumberField,
    Show,
    EditButton,
    SimpleShowLayout,
    TopToolbar,
} from "react-admin";
import { getImageSrc } from "../../utils";
const handleImage = (src) => {
    var iframe =
        "<iframe width='100%' height='100%' src='" + src + "'></iframe>";
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
};
const PostTitle = ({ record }) => {
    return <span>Approval id: {record ? `${record.id}` : ""}</span>;
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

// export const ReportingEdit = (props) => {
//     return (
//         <Edit {...props} title={<PostTitle />}>
//             <SimpleForm>
//                 {/* <TextField source="id" label="Reporting id" /> */}
//                 <BooleanInput source="isChecked" />
//                 <TextInput multiline source="message" />
//                 <DateField source="updatedAt" label="Updated On" />
//                 <DateField source="createdAt" label="Created On" />
//             </SimpleForm>
//         </Edit>
//     );
// };

export const ApprovalList = (props) => (
    <List
        {...props}
        sort={{
            field: "expiresAt:ASC,isApproved",
            order: "DESC",
        }}
        perPage={5}
        filter={{ isApproved: false }}
    >
        <Datagrid rowClick="show">
            <BooleanField source="isApproved" />
            <ReferenceField
                source="campaignId"
                reference="campaigns"
                linkType="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <CusImageField source="document" />
            <DateField source="expiresAt" label="Expires" />
            <NumberField source="limit.$numberDecimal" label="Limit" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <TextField source="id" />
        </Datagrid>
    </List>
);

const ShowActions = ({ data, basePath }) => {
    return (
        <TopToolbar>
            {data && <EditButton basePath={basePath} record={data} />}
        </TopToolbar>
    );
};

export const ApprovalShow = (props) => (
    <Show {...props} actions={<ShowActions />}>
        <SimpleShowLayout>
            <ReferenceField
                source="campaignId"
                reference="campaigns"
                linkType="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <CusImageField source="document" label="Cover Image" width="500" />
            <BooleanField source="isApproved" />
            <DateField source="expiresAt" label="Expires" />
            <NumberField source="limit.$numberDecimal" label="Limit" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <TextField source="id" />
        </SimpleShowLayout>
    </Show>
);

export const ApprovalEdit = (props) => (
    <Edit {...props} title={<PostTitle />} /*aside={<Aside />}*/>
        <SimpleForm>
            <CusImageField source="document" />
            <BooleanInput source="isApproved" />
            <DateField source="expiresAt" label="Expires" />
            <NumberField source="limit.$numberDecimal" label="Limit" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <TextField source="id" />
        </SimpleForm>
    </Edit>
);
