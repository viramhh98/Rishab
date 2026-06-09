import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fileService from "../services/image.services";
import { ArrowLeft, Plus, Search, Building2 } from "lucide-react";

import { companyService } from "../services/company.services";

import { handleApiError } from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Input } from "../components/ui/input";

import { Card, CardContent } from "../components/ui/card";

export default function CompanyManagement() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const data = await companyService.getAll();

      setCompanies(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/settings")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">Company Management</h1>

            <p className="mt-2 text-muted-foreground">
              Manage company information and branding.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Button onClick={() => navigate("/settings/companies/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <Card className="col-span-full">
            <CardContent className="flex items-center justify-center p-10">
              Loading companies...
            </CardContent>
          </Card>
        ) : filteredCompanies.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center gap-4 p-10">
              <p className="text-muted-foreground">No companies found</p>

              <Button onClick={() => navigate("/settings/companies/create")}>
                Create Company
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredCompanies.map((company) => {
          

            return (
              <Card
                key={company.id}
                className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
                onClick={() => navigate(`/settings/companies/${company.id}`)}
              >
                <CardContent className="flex flex-col items-center gap-4 p-6">
                  {company.logo ? (
                    <img
                      src={fileService.getImageUrl(company.logo)}
                      alt={company.companyName}
                      className="h-28 w-28 rounded-xl border object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border bg-muted">
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}

                  <h3 className="text-center font-medium">
                    {company.companyName}
                  </h3>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
