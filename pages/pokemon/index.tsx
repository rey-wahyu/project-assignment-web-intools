import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Container, Typography } from "@material-ui/core";

const PokemonList: FC = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="xl">
            <Box component="div" m={10}>
                <Typography>List Pokemon</Typography>
            </Box>
        </Container>
    );
};

export default PokemonList;
