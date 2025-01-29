import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "../../../components/data-table/data-category";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { InfoDialogButton } from "./info-dialog-button";
import { ShowPDFDialog } from "./show-pdf-dialog";
import type { GetReports200Item } from "@/api/swagger";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<GetReports200Item>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ID"
        className="hidden lg:flex"
      />
    ),
    cell: ({ row }) => (
      <div className="hidden lg:flex">{row.getValue("id")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Titulo"
        className="hidden lg:flex"
      />
    ),
    cell: ({ row }) => (
      <div className="hidden lg:flex truncate">{row.getValue("title")}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => {
      return (
        <InfoDialogButton
          trigger={
            <div className="max-w-48 lg:max-w-xs truncate font-medium cursor-pointer">
              {row.getValue("description")}
            </div>
          }
          description={row.getValue("description")}
          title={row.getValue("title")}
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Categorias"
        className="hidden lg:flex justify-center items-center"
      />
    ),
    cell: ({ row }) => {
      const category = CATEGORY_LABELS.find(
        (label) => label.value === row.getValue("category")
      );

      if (!category) {
        return null;
      }

      return (
        <div className="hidden lg:flex justify-center">
          <span>
            <Badge variant="outline">{category.label}</Badge>
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "file_url",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Download"
        className="text-center hidden lg:block"
      />
    ),
    cell: ({ row }) => (
      <div className="justify-center flex">
        <Button asChild variant="ghost" className="flex h-8 w-8 p-0">
          <a href={`${row.getValue("file_url")}`} download>
            <Download />
          </a>
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pdf_url",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PDF"
        className="text-center hidden lg:block"
      />
    ),
    cell: ({ row }) => (
      <div className="justify-center flex">
        <ShowPDFDialog url={row.getValue("pdf_url")} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
