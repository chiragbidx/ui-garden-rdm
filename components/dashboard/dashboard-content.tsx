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
  DollarSign,
  FolderKanban,
  Search,
  TrendingUp,
  Users,
  Zap,
  Play,
  ListVideo,
  Heart
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

type Metric = {
  label: string;
  value: string;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

type OnboardingStep = {
  title: string;
  description: string;
  href: string;
  done: boolean;
};

type ActivityItem = {
  title: string;
  detail: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MockMovie = {
  id: string;
  title: string;
  genre: string;
  status: string;
};

const metrics: Metric[] = [
  { label: "Total Streams", value: "14,820", trend: "+9.1%", icon: Play, description: "vs last month" },
  { label: "My List", value: "18", trend: "+3 new", icon: ListVideo, description: "shows & movies" },
  { label: "Favorites", value: "7", trend: "+1 new", icon: Heart, description: "favorite movies" },
  { label: "Active Profiles", value: "3", trend: "No change", icon: Users, description: "in your household" },
];

const onboardingSteps: OnboardingStep[] = [
  { title: "Create a Profile", description: "Set up different users for your family.", href: "/dashboard/settings", done: false },
  { title: "Add to My List", description: "Bookmark shows or movies to watch later.", href: "/dashboard/feature", done: false },
  { title: "Invite a Friend", description: "Share StreamNest with your friends.", href: "/dashboard/team", done: false },
  { title: "Explore Catalog", description: "Browse trending titles and new releases.", href: "#features", done: false },
];

const recentActivity: ActivityItem[] = [
  { title: "Added to My List", detail: "The Grand Show added", time: "Just now", icon: ListVideo },
  { title: "Stream finished", detail: "Watched 'City Nights'", time: "8 min ago", icon: Play },
  { title: "New favorite", detail: "'Rising Stars' marked as favorite", time: "20 min ago", icon: Heart },
  { title: "Profile created", detail: "Jamie added a new profile", time: "1 hr ago", icon: Users },
  { title: "Achievement", detail: "Watched 10 movies in a week", time: "Yesterday", icon: Zap },
];

const quickActions = [
  { label: "Add to My List", href: "/dashboard/feature", icon: ListVideo },
  { label: "Account settings", href: "/dashboard/settings", icon: Activity },
  { label: "Share StreamNest", href: "/dashboard/team", icon: Users },
];

const weeklyData = [
  { day: "Mon", streams: 82 },
  { day: "Tue", streams: 105 },
  { day: "Wed", streams: 97 },
  { day: "Thu", streams: 124 },
  { day: "Fri", streams: 132 },
  { day: "Sat", streams: 112 },
  { day: "Sun", streams: 68 },
];

const monthlyStreams = [
  { month: "Jan", value: 4820 },
  { month: "Feb", value: 6880 },
  { month: "Mar", value: 7350 },
  { month: "Apr", value: 8120 },
  { month: "May", value: 9220 },
  { month: "Jun", value: 10510 },
  { month: "Jul", value: 12850 },
  { month: "Aug", value: 14210 },
  { month: "Sep", value: 13180 },
  { month: "Oct", value: 13800 },
  { month: "Nov", value: 15420 },
  { month: "Dec", value: 14820 },
];

const initialMockMovies: MockMovie[] = [
  { id: "m-1", title: "City Nights", genre: "Drama", status: "To Watch" },
  { id: "m-2", title: "Rising Stars", genre: "Family", status: "In Progress" },
  { id: "m-3", title: "The Grand Show", genre: "Action", status: "Watched" },
];

function BarChart({ data }: { data: typeof weeklyData }) {
  const maxStreams = Math.max(...data.map((d) => d.streams));

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1.5 h-[140px]">
        {data.map((d) => {
          const height = (d.streams / maxStreams) * 100;
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground font-medium">{d.streams}</span>
              <div
                className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary min-h-[4px]"
                style={{ height: `${height}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1.5">
        {data.map((d) => (
          <div key={d.day} className="flex-1 text-center text-[10px] text-muted-foreground">
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
}

function AreaChart({ data }: { data: typeof monthlyStreams }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value)) * 0.8;
  const range = maxVal - minVal;
  const w = 400;
  const h = 140;
  const padding = 4;

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * (w - padding * 2),
    y: h - padding - ((d.value - minVal) / range) * (h - padding * 2),
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[140px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGradient)" />
        <path d={linePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="flex justify-between px-1">
        {data.filter((_, i) => i % 2 === 0).map((d) => (
          <span key={d.month} className="text-[10px] text-muted-foreground">{d.month}</span>
        ))}
      </div>
    </div>
  );
}

function matchesQuery(query: string, ...fields: string[]): boolean {
  const q = query.toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(q));
}

export function DashboardContent({ greeting, firstName }: { greeting: string; firstName: string }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MockMovie[]>(initialMockMovies);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<MockMovie | null>(null);

  const filteredMetrics = useMemo(
    () => (query ? metrics.filter((m) => matchesQuery(query, m.label, m.value, m.description)) : metrics),
    [query]
  );

  const filteredSteps = useMemo(
    () => (query ? onboardingSteps.filter((s) => matchesQuery(query, s.title, s.description)) : onboardingSteps),
    [query]
  );

  const filteredActivity = useMemo(
    () => (query ? recentActivity.filter((a) => matchesQuery(query, a.title, a.detail)) : recentActivity),
    [query]
  );

  const showMetrics = filteredMetrics.length > 0;
  const showOnboarding = filteredSteps.length > 0;
  const showCharts = !query || matchesQuery(query, "performance", "chart", "graph", "streams", "engagement", "weekly", "monthly");
  const showActivity = filteredActivity.length > 0;
  const showCrudExample =
    !query || matchesQuery(query, "crud", "dialog", "modal", "movie", "add", "edit", "list", "my list");
  const noResults = !showMetrics && !showOnboarding && !showCharts && !showActivity && !showCrudExample;

  function openCreateDialog() {
    setEditingMovie(null);
    setDialogOpen(true);
  }

  function openEditDialog(movie: MockMovie) {
    setEditingMovie(movie);
    setDialogOpen(true);
  }

  function handleSaveMovie(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const genre = String(formData.get("genre") ?? "").trim();
    const status = String(formData.get("status") ?? "").trim();

    if (!title || !genre || !status) return;

    if (editingMovie) {
      setMovies((prev) =>
        prev.map((movie) =>
          movie.id === editingMovie.id
            ? { ...movie, title, genre, status }
            : movie
        )
      );
    } else {
      setMovies((prev) => [{ id: `m-${Date.now()}`, title, genre, status }, ...prev]);
    }

    setDialogOpen(false);
  }

  return (
    <>
      {/* Welcome banner */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {greeting}, {firstName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your personalized StreamNest dashboard—see your latest activity and manage your lists.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-1.5"
                  disabled={action.href === "#"}
                >
                  <Link href={action.href}>
                    <Icon className="size-3.5" />
                    <span className="hidden sm:inline">{action.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search dashboard..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-10 bg-muted/50 border-muted-foreground/15 focus-visible:border-border focus-visible:bg-background"
          />
        </div>
      </div>

      {noResults && (
        <Card className="mb-8">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="size-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium">No results found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try a different search term or clear the filter.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Metric cards */}
      {showMetrics && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredMetrics.map((metric) => {
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
                  <div className="mt-1 flex items-center gap-1.5">
                    <Badge
                      variant="secondary"
                      className="rounded-md px-1.5 py-0 text-xs font-medium text-emerald-700 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/15 border-0"
                    >
                      {metric.trend}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{metric.description}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Middle section */}
      {(showOnboarding || showCharts) && (
        <div className="mb-8 grid gap-6 lg:grid-cols-5">
          {showOnboarding && (
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Getting Started</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    0 / {onboardingSteps.length}
                  </Badge>
                </div>
                <CardDescription>Set up your profiles and lists for a tailored experience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {filteredSteps.map((step) => (
                  <Link
                    key={step.title}
                    href={step.href}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
                  >
                    {step.done ? (
                      <CheckCircle2 className="size-[18px] shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="size-[18px] shrink-0 text-muted-foreground/40" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium leading-none">{step.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {showCharts && (
            <Card className={showOnboarding ? "lg:col-span-3" : "lg:col-span-5"}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Weekly Streams</CardTitle>
                    <CardDescription>Total streams this week</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs font-medium">
                    720 total
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <BarChart data={weeklyData} />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Streams chart */}
      {showCharts && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Streams Overview</CardTitle>
                  <CardDescription>Monthly streams for the current year</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold tracking-tight">14,820</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+9.1% from last month</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <AreaChart data={monthlyStreams} />
            </CardContent>
          </Card>
        </div>
      )}

      {showCrudExample && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base">My List</CardTitle>
                  <CardDescription>
                    Add and update your saved movies or shows
                  </CardDescription>
                </div>
                <Button size="sm" onClick={openCreateDialog}>
                  Add title
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center justify-between rounded-md border border-border/70 p-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{movie.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Genre: {movie.genre} • Status: {movie.status}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(movie)}
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingMovie ? "Edit title" : "Add title"}
                </DialogTitle>
                <DialogDescription>
                  This is mock data in local component state. No backend call is made.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSaveMovie} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="movie-title">Title</Label>
                  <Input
                    id="movie-title"
                    name="title"
                    defaultValue={editingMovie?.title ?? ""}
                    placeholder="e.g. The Grand Show"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="movie-genre">Genre</Label>
                  <Input
                    id="movie-genre"
                    name="genre"
                    defaultValue={editingMovie?.genre ?? ""}
                    placeholder="Drama, Action, Family..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="movie-status">Status</Label>
                  <Input
                    id="movie-status"
                    name="status"
                    defaultValue={editingMovie?.status ?? "To Watch"}
                    placeholder="To Watch, In Progress, Watched"
                    required
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingMovie ? "Save changes" : "Add"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Activity feed */}
      {showActivity && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <CardDescription>Your latest streaming events and milestones</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs" disabled>
                View all
                <ArrowUpRight className="size-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {filteredActivity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={`${item.title}-${item.time}`}>
                    <div className="flex items-center gap-4 py-3">
                      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted">
                        <Icon className="size-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    {i < filteredActivity.length - 1 ? <Separator /> : null}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}