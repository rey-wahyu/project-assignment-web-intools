import React, { FC, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";

import {
    Box,
    Link,
    Card,
    CardContent,
    Container,
    Grid,
    List,
    ListItem,
    Typography,
} from "@material-ui/core";
import { ROUTES_PATH } from "@constants/config";

const Index: FC = () => {
    const { t } = useTranslation();

    useEffect(() => {
        setLanguage("id")
    }, []);

    return (
        <>
            <Head>
                <title>REY - Project Test</title>
            </Head>
            <Container maxWidth="xl">
                <Box component="div" m={10}>
                    <Grid container>
                        <Grid container justifyContent="center" item xs={12}>
                            <Typography
                                align="center"
                                variant="h4"
                                component="h3"
                            >
                                {t("home:welcome-title")}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent="center" item xs={12}>
                            <Box component="div" m={8}>
                                <Container maxWidth="sm">
                                    <Box m="5" height={30} />
                                    <Card variant="elevation" elevation={8}>
                                        <CardContent>
                                            <List>
                                                {Object.keys(ROUTES_PATH).map(
                                                    (key, value) => (
                                                        <ListItem
                                                            disableGutters
                                                            key={`requirement-list-${key}`}
                                                        >
                                                            <Link href={ROUTES_PATH[key]}>{key}</Link>
                                                        </ListItem>
                                                    ),
                                                )}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Container>
                            </Box>
                        </Grid>
                        <Grid container justifyContent="center" item xs={12}>
                            <Box component="div" m={5}>
                                <Typography variant="h4" component="h3">
                                    {t("home:welcome-work")}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default Index;
