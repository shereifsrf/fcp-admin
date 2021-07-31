import * as React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";

export default function Dashboard() {
    return (
        <Card>
            <CardHeader title="Welcome to the administration page" />
            <CardContent>
                Dashboard of whats going on in Campaign Module
            </CardContent>
        </Card>
    );
}
