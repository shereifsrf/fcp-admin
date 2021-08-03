// import { values } from "lodash";
import * as React from "react";

import {
    TextField,
    DateField,
    SimpleForm,
    Edit,
    BooleanInput,
    useRecordContext,
} from "react-admin";
import { getImageSrc } from "../../utils";
import { FormHelperText } from "@material-ui/core";

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

const PostTitle = ({ record }) => {
    return <span>Proof id: {record ? `${record.id}` : ""}</span>;
};

const redirect = (basePath, id, data) => `/campaigns/${data.campaignId}`;

export const ProofEdit = (props) => {
    return (
        <Edit {...props} title={<PostTitle />}>
            <SimpleForm redirect={redirect}>
                <TextField source="id" label="Proof id" />
                <CusImageField
                    source="document"
                    width={300}
                    label="Cover Image"
                />
                <BooleanInput source="isChecked" />
                <DateField source="updatedAt" label="Updated On" />
                <DateField source="createdAt" label="Created On" />
            </SimpleForm>
        </Edit>
    );
};
