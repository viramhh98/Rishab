// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import { ArrowLeft } from "lucide-react";

// import { roleService } from "../services/role.services";

// import { handleApiError, handleSuccess } from "../lib/error-handler";

// import { Button } from "../components/ui/button";

// import { Card, CardContent } from "../components/ui/card";

// import { Checkbox } from "../components/ui/checkbox";

// export default function RoleDetails() {
//   const { id } = useParams();

//   const navigate = useNavigate();

//   const [role, setRole] = useState(null);

//   const [allPermissions, setAllPermissions] = useState([]);

//   const [selectedPermissions, setSelectedPermissions] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [saving, setSaving] = useState(false);

//   const fetchRole = async () => {
//     try {
//       setLoading(true);

//       const data = await roleService.getById(id);

//       setRole(data.role);

//       setAllPermissions(data.allPermissions);

//       setSelectedPermissions(
//         data.role.permissions.map((permission) => permission.id),
//       );
//     } catch (error) {
//       handleApiError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRole();
//   }, [id]);

//   const togglePermission = (permissionId) => {
//     setSelectedPermissions((prev) => {
//       if (prev.includes(permissionId)) {
//         return prev.filter((id) => id !== permissionId);
//       }

//       return [...prev, permissionId];
//     });
//   };

//   const handleSave = async () => {
//     try {
//       setSaving(true);

//       await roleService.updatePermissions(id, {
//         permissionIds: selectedPermissions,
//       });

//       handleSuccess("Role permissions updated successfully");

//       await fetchRole();
//     } catch (error) {
//       handleApiError(error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const groupedPermissions = allPermissions.reduce((acc, permission) => {
//     const [category, type] = permission.name.split(":");

//     if (!acc[category]) {
//       acc[category] = [];
//     }

//     acc[category].push({
//       ...permission,
//       type,
//     });

//     return acc;
//   }, {});

//   if (loading) {
//     return (
//       <Card>
//         <CardContent className="flex items-center justify-center p-10">
//           <p className="text-muted-foreground">Loading role details...</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <section className="rounded-2xl border bg-card p-8">
//         <div className="flex items-start gap-4">
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => navigate("/settings/roles")}
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </Button>

//           <div>
//             <h1 className="text-3xl font-bold capitalize">{role?.name}</h1>

//             <p className="mt-2 text-muted-foreground">
//               Manage role permissions
//             </p>
//           </div>
//         </div>
//       </section>

//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//         {Object.entries(groupedPermissions).map(([category, permissions]) => (
//           <Card key={category} className="h-full">
//             <CardContent className="p-5">
//               <div className="mb-4">
//                 <h3 className="text-lg font-semibold capitalize">{category}</h3>

//                 <p className="text-sm text-muted-foreground">
//                   {permissions.length} Permissions
//                 </p>
//               </div>

//               <div className="space-y-3">
//                 {permissions.map((permission) => (
//                   <div
//                     key={permission.id}
//                     className="flex items-center gap-3 rounded-lg border p-3"
//                   >
//                     <Checkbox
//                       checked={selectedPermissions.includes(permission.id)}
//                       onCheckedChange={() => togglePermission(permission.id)}
//                     />

//                     <span className="text-sm font-medium capitalize">
//                       {permission.type}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="flex justify-end">
//         <Button size="lg" disabled={saving} onClick={handleSave}>
//           {saving ? "Saving..." : "Save Changes"}
//         </Button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { roleService } from "../services/role.services";

import { handleApiError, handleSuccess } from "../lib/error-handler";

import { Button } from "../components/ui/button";

import { Card, CardContent } from "../components/ui/card";

import { Checkbox } from "../components/ui/checkbox";

export default function RoleDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [role, setRole] = useState(null);

  const [assignedUser, setAssignedUser] = useState(null);

  const [allPermissions, setAllPermissions] = useState([]);

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const fetchRole = async () => {
    try {
      setLoading(true);

      const data = await roleService.getById(id);

      setRole(data.role);

      setAssignedUser(data.assignedUser);

      setAllPermissions(data.allPermissions);

      setSelectedPermissions(
        data.role.permissions.map((permission) => permission.id),
      );
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRole();
  }, [id]);

  const togglePermission = (permissionId) => {
    setSelectedPermissions((prev) => {
      if (prev.includes(permissionId)) {
        return prev.filter((id) => id !== permissionId);
      }

      return [...prev, permissionId];
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await roleService.updatePermissions(id, {
        permissionIds: selectedPermissions,
      });

      handleSuccess("Role permissions updated successfully");

      await fetchRole();
    } catch (error) {
      handleApiError(error);
    } finally {
      setSaving(false);
    }
  };

  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    const [category, type] = permission.name.split(":");

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push({
      ...permission,
      type,
    });

    return acc;
  }, {});

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-10">
          <p className="text-muted-foreground">Loading role details...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/settings/roles")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold capitalize">{role?.name}</h1>

            <p className="mt-2 text-muted-foreground">
              Manage role permissions
            </p>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Users With This Role</h2>

          {assignedUser ? (
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="font-medium">{assignedUser.username}</p>

                <p className="text-sm text-muted-foreground">
                  User assigned to this role
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  navigate(`/settings/users/${assignedUser.id}/edit`)
                }
              >
                Edit User
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-6 text-center">
              <p className="text-muted-foreground">
                No user assigned to this role
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(groupedPermissions).map(([category, permissions]) => (
          <Card key={category} className="h-full">
            <CardContent className="p-5">
              <div className="mb-4">
                <h3 className="text-lg font-semibold capitalize">{category}</h3>

                <p className="text-sm text-muted-foreground">
                  {permissions.length} Permissions
                </p>
              </div>

              <div className="space-y-3">
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <Checkbox
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />

                    <span className="text-sm font-medium capitalize">
                      {permission.type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button size="lg" disabled={saving} onClick={handleSave}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
