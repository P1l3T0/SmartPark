import type { UserResponse } from "../../Utils/interfaces";

interface ProfileDataProps {
  user: UserResponse;
}

const ProfileData = ({ user }: ProfileDataProps) => {
  const memberSince = new Date(user.createdDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <dl className="space-y-3 text-sm">
      {[
        { label: "Username", value: user.login },
        { label: "First Name", value: user.firstName },
        { label: "Last Name", value: user.lastName },
        { label: "Email", value: user.email },
        { label: "Member Since", value: memberSince },
        { label: "Role", value: user.authorities?.join(", ") },
      ].map(({ label, value }) => (
        <div key={label} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0 last:pb-0">
          <dt className="font-medium text-text-secondary">{label}</dt>
          <dd className="text-text-primary text-right">{value}</dd>
        </div>
      ))}
    </dl>
  );
};

export default ProfileData;
