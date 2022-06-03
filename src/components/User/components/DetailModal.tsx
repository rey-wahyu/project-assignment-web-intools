import FilterView from "@components/InstantTemplate";
import InstantTemplateProvider from "@components/InstantTemplate/context";
import {
    COLUMNS_TABLE_JOB,
    MODULE_FORMS_JOB,
} from "@components/Job/constants/config";
import { API_BACKOFFICE } from "@constants/config";
import useXFetcher from "@helpers/fetcher/useXFetcher";
import Loading from "@components/Loading";
import DateFnsUtils from "@date-io/date-fns";
import { Button, Grid, Modal } from "@material-ui/core";
import {
    cssInputField,
    cssModalWrapper,
    cssFooter,
} from "@themes/reusableCustomStyle";
import { FC, useEffect, useState } from "react";
import { PROPS } from "../constants/inteface";

const DetailModal: FC<PROPS> = ({ open, handleCloseModal, id, data }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [snapshot, setSnapshot] = useState();

    const { get } = useXFetcher(`${API_BACKOFFICE}/v1/api/user`);

    const handleListResponseTransform = (response) => {
        let temp = response;
        temp = temp.map((item) => ({
            ...item,
            startDate: new DateFnsUtils().format(
                new Date(item.startDate),
                "dd MMMM yyyy",
            ),
            endDate: new DateFnsUtils().format(
                new Date(item.endDate),
                "dd MMMM yyyy",
            ),
        }));

        return temp;
    };

    useEffect(() => {
        const handleGetDetail = () => {
            get(`/${id}`)
                .then((response) => setSnapshot(response || {}))
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => setIsLoading(false));
        };
        if (id && typeof id !== "object") handleGetDetail();
    }, [id]);

    return (
        <Modal open={open}>
            <div className={cssModalWrapper}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <b>Name</b>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cssInputField}>
                                {snapshot?.name}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <b>Address</b>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cssInputField}>
                                {snapshot?.address}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <b>Phone</b>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cssInputField}>
                                {snapshot?.phone}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid item xs={12} style={{ marginBottom: 16 }}>
                                <b>Username</b>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={cssInputField}>
                                    {snapshot?.username}
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid item xs={12} style={{ marginBottom: 16 }}>
                                <b>Email</b>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={cssInputField}>
                                    {snapshot?.email}
                                </div>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <b>Jobs</b>
                        </Grid>

                        <Grid item xs={12}>
                            <InstantTemplateProvider>
                                <FilterView
                                    showAddButton
                                    tableFixed
                                    apiURL={`/api/user/${id}/job`}
                                    moduleTable={COLUMNS_TABLE_JOB}
                                    moduleForms={MODULE_FORMS_JOB}
                                    apiListResponseTransform={
                                        handleListResponseTransform
                                    }
                                    exportFilename="job"
                                />
                            </InstantTemplateProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={handleCloseModal}
                            >
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </div>
        </Modal>
    );
};

export default DetailModal;