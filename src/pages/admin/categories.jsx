import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SvgIcon from "@mui/material/SvgIcon";
import DynamicModal from "@/components/GlobalComponents/DynamicModal";
import DataTable from "@/components/GlobalComponents/DataTable";
import { Search } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import DashboardLayout from "@/components/admin/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/CategorySlice";
const Page = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { categories, loading, count } = useSelector(
    (state) => state.categories
  );
  const getPagination = (page, limit) => {
    page++;
    dispatch(fetchCategories({ page, limit }));
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModel = () => {
    setOpenModal(true);
  };

  const search = (e) => {
    const value = e.target.value;
    if (e.key === "Enter") {
      if (value) {
        dispatch(fetchCategories({ name: value }));
      } else {
        dispatch(fetchCategories());
      }
    }
  };

  return (
    <>
      <Head>
        <title>{`${process.env.APP_NAME} | Categories`}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                mb: 5,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h3">
                {t("All Categories")}
              </Typography>
              <Box sx={{ m: 1 }}>
                <DynamicModal
                  setOpenModal={setOpenModal}
                  open={openModal}
                  model="categories"
                />

                <Button
                  onClick={handleOpenModel}
                  color="primary"
                  variant="contained"
                >
                  {t("Add Category")}
                </Button>
              </Box>
            </Box>
            {/* <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box sx={{ maxWidth: 500 }}>
                    <TextField
                      onKeyPress={(e) => search(e)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small">
                              <Search />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder={t("Search Categories")}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box> */}
          </Box>
          <Box sx={{ mt: 3 }}>
            <DataTable
              getPagination={getPagination}
              count={count}
              items={categories}
              loading={loading}
              model={"categories"}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
