import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { RootPrivateStackParamList } from "../../routes";
import { useProductListFiltersStore } from "../../store/product-list-filters";
import { useForm } from "react-hook-form";
import { Container, StyledButton, StyledSelectInput } from "./styles";
import { useQuery } from "react-query";
import { GetProductCategories } from "../../../domain/usecases/product/get-product-categories";
import { ScrollView } from "react-native";
import { Button } from "../../components/buttons/button/button";
import { SegmentedControl } from "../../components/form/segmented-control/segmented-control";
import { StackNavbar } from "../../components/navigation/stack-navbar/stack-navbar";

type NavigationProps = StackScreenProps<
  RootPrivateStackParamList,
  "ProductListFilters"
>;

type Props = NavigationProps & {
  getProductCategories: GetProductCategories;
};

type FormValues = {
  brand: string;
  category: string;
  ordination: string;
};

const BRANDS = [
  {
    label: "Karsten",
    value: "1",
  },
  {
    label: "Trussardi",
    value: "2",
  },
  {
    label: "Karsten Decor",
    value: "3",
  },
];

const ORDINATION_OTPIONS = [
  {
    label: "Alfabética",
    value: "D",
  },
  { label: "Lançamento", value: "L" },
];

export const ProductListFilters = ({
  getProductCategories,
  navigation: { goBack, setOptions },
}: Props) => {
  const { filters, setFilters, clearFilters } = useProductListFiltersStore();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      brand: filters?.brand?.apiValue,
      category: filters?.category?.apiValue,
      ordination: filters?.ordination?.apiValue,
    },
  });

  const {
    data: categories,
    isLoading: loadingCategories,
    isRefetching: refreshingCategories,
  } = useQuery(
    "get-product-categories",
    async () => {
      const { categories } = await getProductCategories.execute();

      return categories;
    },
    { staleTime: 1000 * 60 * 60 }
  );

  const handleFilter = ({ category, brand, ordination }: FormValues) => {
    console.log("TASDASD", category, brand);

    const categoryFilter = category
      ? {
          label: "Categoria",
          apiValue: category,
          value: category,
          key: "category",
        }
      : null;

    const brandFilter = brand
      ? {
          label: "Marca",
          apiValue: brand,
          value: BRANDS.find((item) => item.value === brand).label,
          key: "brand",
        }
      : null;

    const ordinationFilter = ordination
      ? {
          ...filters.ordination,
          apiValue: ordination,
          value: ORDINATION_OTPIONS.find((item) => item.value === ordination)
            .label,
        }
      : null;

    setFilters({
      ...filters,
      category: categoryFilter,
      brand: brandFilter,
      ordination: ordinationFilter,
    });

    goBack();
  };

  const handleClearFilters = () => {
    reset({
      ordination: "D",
    });
    clearFilters();
  };

  useEffect(() => {
    setOptions({
      header: (props) => (
        <StackNavbar
          rightIcon="filter-off-outline"
          onRightIconPress={handleClearFilters}
          {...props}
        />
      ),
    });
  }, []);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StyledSelectInput
          name="brand"
          control={control}
          options={BRANDS}
          placeholder="Marca"
        />
        <StyledSelectInput
          name="category"
          control={control}
          options={categories}
          loading={loadingCategories || refreshingCategories}
          placeholder="Categoria"
        />
        <SegmentedControl
          label="Ordenação"
          name="ordination"
          defaultValue={filters?.ordination?.value}
          control={control}
          options={ORDINATION_OTPIONS}
        />
      </ScrollView>
      <StyledButton text="Filtrar" onPress={handleSubmit(handleFilter)} />
    </Container>
  );
};
