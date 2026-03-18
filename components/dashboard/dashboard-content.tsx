"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Circle,
  Play,
  ListVideo,
  Heart,
  Users,
  Zap,
  Film,
  Star,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type ContentItem = {
  id: string;
  title: string;
  poster: string;
  genre: string;
  status: string;
  progress: number; // percent watched
  isFavorite: boolean;
  isContinue: boolean;
};

const trending: ContentItem[] = [
  {
    id: "1",
    title: "Edge of Tomorrow",
    poster: "/demo-img.jpg",
    genre: "Action",
    status: "Trending",
    progress: 0,
    isFavorite: true,
    isContinue: false,
  },
  {
    id: "2",
    title: "Brighter Days",
    poster: "/team2.jpg",
    genre: "Drama",
    status: "Trending",
    progress: 0,
    isFavorite: false,
    isContinue: false,
  },
  {
    id: "3",
    title: "Neon Nights",
    poster: "/team1.jpg",
    genre: "Thriller",
    status: "Trending",
    progress: 0,
    isFavorite: false,
    isContinue: true,
  },
  {
    id: "4",
    title: "StarVoyage",
    poster: "/team3.jpg",
    genre: "Sci-Fi",
    status: "Trending",
    progress: 0,
    isFavorite: true,
    isContinue: false,
  },
];

const continueWatching: ContentItem[] = [
  {
    id: "3",
    title: "Neon Nights",
    poster: "/team1.jpg",
    genre: "Thriller",
    status: "Continue Watching",
    progress: 56,
    isFavorite: false,
    isContinue: true,
  },
  {
    id: "5",
    title: "Hidden Gems",
    poster: "/team2.jpg",
    genre: "Documentary",
    status: "Continue Watching",
    progress: 83,
    isFavorite: true,
    isContinue: true,
  },
];

const myListInitial: ContentItem[] = [
  ...trending.slice(0, 2),
  ...continueWatching,
  {
    id: "6",
    title: "Laugh Factory",
    poster: "/hero-image-dark.jpeg",
    genre: "Comedy",
    status: "To Watch",
    progress: 0,
    isFavorite: false,
    isContinue: false,
  },
];

const metricCards = [
  {
    label: "Continue Watching",
    value: continueWatching.length.toString(),
    icon: Play,
    description: "in progress",
  },
  {
    label: "My List",
    value: myListInitial.length.toString(),
    icon: ListVideo,
    description: "titles saved",
  },
  {
    label: "Favorites",
    value: myListInitial.filter((i) => i.isFavorite).length.toString(),
    icon: Heart,
    description: "favorite titles",
  },
  {
    label: "Profiles",
    value: "3",
    icon: Users,
    description: "active profiles",
  },
];

export function DashboardContent({ greeting, firstName }: { greeting: string; firstName: string }) {
  const [search, setSearch] = useState("");
  const [myList, setMyList] = useState<ContentItem[]>(myListInitial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  function openAddDialog() {
    setEditingItem(null);
    setDialogOpen(true);
  }

  function openEditDialog(item: ContentItem) {
    setEditingItem(item);
    setDialogOpen(true);
  }

  function handleSaveItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const genre = String(formData.get("genre") ?? "").trim();
    const status = String(formData.get("status") ?? "To Watch").trim();
    const poster = String(formData.get("poster") ?? "/demo-img.jpg").trim();

    if (!title || !genre || !status) return;

    if (editingItem) {
      setMyList((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, title, genre, status } : item
        )
      );
    } else {
      setMyList((prev) => [
        { id: `c-${Date.now()}`, title, genre, status, poster, progress: 0, isFavorite: false, isContinue: false },
        ...prev,
      ]);
    }

    setDialogOpen(false);
  }

  function toggleFavorite(id: string) {
    setMyList((list) =>
      list.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  }

  // UI Filtering/search - filtering just "My List"
  const filteredMyList = myList.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome and Actions */}
      <div className="mb-2 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {greeting}, {firstName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Discover trending shows, pick up where you left off, or explore your saved favorites.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={openAddDialog} variant="default" size="sm" className="gap-1.5">
              <Film className="size-3.5" />
              Add to My List
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/dashboard/settings">
                <Activity className="size-3.5" /> Account Settings
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative w-full max-w-lg">
          <input
            type="search"
            placeholder="Search My List..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 w-full rounded-md border border-border bg-muted/50 focus-visible:border-primary text-base"
            aria-label="Search My List"
          />
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="mb-2 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription className="text-sm font-medium">{metric.label}</CardDescription>
                <div className="rounded-md bg-muted p-2">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{metric.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{metric.description}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Continue Watching Carousel */}
      <SectionCarousel
        title="Continue Watching"
        items={continueWatching}
        emptyLabel="No shows in progress"
        seeAllLink={null}
        highlightProgress
      />

      {/* Trending Now Carousel */}
      <SectionCarousel
        title="Trending Now"
        items={trending}
        emptyLabel="No trending titles"
        seeAllLink="#features"
      />

      {/* My List */}
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">My List</CardTitle>
              <CardDescription>
                Your personal watchlist—quick add, mark as favorite, or edit details.
              </CardDescription>
            </div>
            <Button size="sm" onClick={openAddDialog}>
              Add Title
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMyList.length === 0 ? (
              <div className="col-span-full text-center text-sm text-muted-foreground p-6">
                No titles in your list yet.
              </div>
            ) : (
              filteredMyList.map((movie) => (
                <div
                  key={movie.id}
                  className="relative flex flex-col gap-2 p-2 border rounded-lg bg-card shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full aspect-[16/9] rounded-md object-cover mb-1"
                  />
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold">{movie.title}</span>
                    {movie.isFavorite && (
                      <Star className="size-3 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{movie.genre}</p>
                  <div className="flex gap-2 items-center mt-auto">
                    <Button
                      size="icon"
                      variant={movie.isFavorite ? "default" : "ghost"}
                      aria-label="Favorite"
                      className="size-8"
                      onClick={() => toggleFavorite(movie.id)}
                    >
                      <Heart className={movie.isFavorite ? "fill-red-500 text-red-600" : ""} />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="size-8"
                      onClick={() => openEditDialog(movie)}
                      aria-label="Edit"
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog for Add/Edit */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Title" : "Add Title"}
            </DialogTitle>
            <DialogDescription>
              {editingItem
                ? "Edit your list entry details."
                : "Add a show or movie to your list."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveItem} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content-title">Title</Label>
              <Input
                id="content-title"
                name="title"
                defaultValue={editingItem?.title ?? ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content-genre">Genre</Label>
              <Input
                id="content-genre"
                name="genre"
                defaultValue={editingItem?.genre ?? ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content-status">Status</Label>
              <Input
                id="content-status"
                name="status"
                defaultValue={editingItem?.status ?? "To Watch"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content-poster">Poster URL</Label>
              <Input
                id="content-poster"
                name="poster"
                defaultValue={editingItem?.poster ?? ""}
                placeholder="/demo-img.jpg"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? "Save Changes" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SectionCarousel({
  title,
  items,
  emptyLabel,
  seeAllLink,
  highlightProgress = false,
}: {
  title: string;
  items: ContentItem[];
  emptyLabel: string;
  seeAllLink?: string | null;
  highlightProgress?: boolean;
}) {
  // Simple left/right scroll using overflow-x for demo
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between px-1 mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {!!seeAllLink && (
          <Link href={seeAllLink} className="text-sm text-primary font-semibold flex items-center gap-0.5">
            See all <ChevronRight className="size-4" />
          </Link>
        )}
      </div>
      {items.length === 0 ? (
        <div className="text-xs text-muted-foreground p-4">{emptyLabel}</div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {items.map((i) => (
            <div
              key={i.id}
              className="flex-shrink-0 w-48 rounded-lg overflow-hidden bg-card border shadow-sm relative group"
              style={{ minWidth: 192, maxWidth: 192 }}
            >
              <img src={i.poster} alt={i.title} className="w-full h-32 object-cover rounded-t-md" />
              <div className="px-3 pt-2 pb-3 flex flex-col gap-0.5">
                <div className="flex items-center gap-1 font-semibold">
                  {i.title}
                  {i.isFavorite && (
                    <Star className="size-3 text-yellow-500 ml-1" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground mb-1">{i.genre}</div>
                {highlightProgress && i.progress > 0 && (
                  <div className="w-full h-2 bg-secondary rounded mb-1">
                    <div className="h-2 bg-primary rounded" style={{ width: `${i.progress}%` }} />
                  </div>
                )}
                <Badge variant="secondary" className="text-[10px] w-fit">
                  {i.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}