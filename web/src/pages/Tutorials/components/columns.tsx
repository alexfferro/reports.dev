import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "../../../components/data-table/data-category";
import { DataTableColumnHeader } from "../../../components/data-table/data-table-column-header";
import type { GetTutorials200Item } from "@/api/swagger";
import { Link } from "react-router-dom";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<GetTutorials200Item>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Titulo" />
    ),
    cell: ({ row }) => (
      <div className="w-full truncate">
        <Link to={`/tutorials/editor/${row.getValue("id")}`}>
          {row.getValue("title")}
        </Link>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categorias" />
    ),
    cell: ({ row }) => {
      const category = CATEGORY_LABELS.find(
        (label) => label.value === row.getValue("category")
      );

      if (!category) {
        return null;
      }

      return (
        <div>
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
