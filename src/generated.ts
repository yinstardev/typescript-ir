/**
 * // Enum example with comments
 * /**
 * User roles within the system.
 */
export enum UserRole {
  /**
   * Admin user with all privileges
   */
  Admin = "ADMIN",
  /**
   * Regular user with limited access
   */
  User = "USER",
  /**
   * Guest user with minimal access
   */
  Guest = "GUEST",
}

/**
 * Represents a basic user.
 */
export interface User {
  /**
   * Unique identifier for the user
   */
  id: number;
  /**
   * Name of the user
   */
  name: string;
  /**
   * Role assigned to the user
   */
  role: UserRole;
}

/**
 * Represents a user's profile including address details.
 */
export interface UserProfile {
  /**
   * Basic user details
   */
  user: User;
  /**
   * Address of the user
   */
  address: Address;
}

/**
 * Address details of a user.
 */
export interface Address {
  street: string;
  city: string;
  country: string;
}

/**
 * Represents a service that can be executed.
 */
export interface Service {
  /**
   * Name of the service
   */
  name: string;
  /**
   * Optional description of the service
   */
  description?: string;
  /**
   * Executes the service
   */
  execute: () => void;
}

/**
 * Wrapper for any type of value with metadata.
 */
export interface Wrapper {
  /**
   * The actual value
   */
  value: string;
  /**
   * Timestamp of when the value was recorded
   */
  timestamp: number;
}

/**
 * Stores translations for different languages.
 */
export interface Translations {
  /**
   * A record of language keys to translation strings
   */
  dictionary: Record<string, string>;
}

/**
 * API Client for user-related operations.
 */
export interface ApiClient {
  /**
   * Fetches a user by ID.
   * @param id The ID of the user.
   * @returns A promise resolving to the user object.
   */
  getUser: (id: number) => Promise<User>;
  /**
   * Saves user settings.
   * @param settings The settings to be saved.
   * @returns A promise resolving to a boolean indicating success.
   */
  saveSettings: (settings: number) => Promise<boolean>;
}

/**
 * Application settings configuration.
 */
export interface AppSettings {
  /**
   * UI theme setting
   */
  theme: "light" | "dark";
  /**
   * User profile details
   */
  profile: UserProfile;
  /**
   * List of active services
   */
  services: Service[];
  /**
   * API client instance
   */
  apiClient: ApiClient;
}

