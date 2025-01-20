import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { UpdateTutorialButton } from "./update-tutorial-button";
import { DeleteTutorialButton } from "./delete-tutorial-button";
import type { GetTutorials200ItemCategory } from "@/api/swagger";
import { useAuth } from "@clerk/clerk-react";

interface TutorialCardProps {
  id: number;
  title: string;
  category: GetTutorials200ItemCategory;
}

export function TutorialCard({ id, title, category }: TutorialCardProps) {
  const { userId } = useAuth();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 justify-between">
          <Link to={`/tutorials/editor/${id}`}>
            <span className="flex gap-3  items-center hover:brightness-75">
              {title}
              <CircleArrowRight />
            </span>
          </Link>
          <div className="flex items-center">
            {userId && <DeleteTutorialButton id={id} />}
            {userId && (
              <UpdateTutorialButton id={id} category={category} title={title} />
            )}
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
