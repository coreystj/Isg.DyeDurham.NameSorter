using Isg.DyeDurham.NameSorter.Tests.DataTypes;
using System.Reflection;
using System.Text;

namespace Isg.DyeDurham.NameSorter.Tests.Utils
{
    internal static class ResourceUtils
    {
        internal static string GetFilePath(ResourceFileType resourceFileType)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            string samplePath = string.Join('.', "Resources", "Samples", resourceFileType.ToString(), "txt");
            string resourcePath = $"{assembly.GetName().Name}.{samplePath}";

            return resourcePath.Replace(".", "\\");
        }

        internal static string Read(ResourceFileType resourceFileType)
        {
            return Read(
                string.Join('.', "Resources", "Samples", resourceFileType.ToString(), "txt"));
        }

        private static string Read(string resourceName)
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            string resourcePath = $"{assembly.GetName().Name}.{resourceName}";

            resourcePath = resourcePath.Replace("\\", ".").Replace("/", ".");

            using (Stream stream = assembly.GetManifestResourceStream(resourcePath))
            {
                if (stream == null) return null;

                using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
                {
                    return reader.ReadToEnd();
                }
            }
        }
    }
}
