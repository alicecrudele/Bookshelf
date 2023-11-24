using System.IO;
using System.Reflection;

namespace Bookshelf.Domain.Helpers
{
  public static class ResourceHelper
  {
      public static bool ResourceExists(string resourcePath, Assembly? assembly = null)
    {
      if (assembly == null) assembly = Assembly.GetCallingAssembly();
      return RawResourceExists(assembly, resourcePath);
    }

    /// <summary>
    ///   Gets the resource as text.
    /// </summary>
    /// <param name="resourcePath">The resource.</param>
    /// <param name="assembly">The assembly.</param>
    /// <returns></returns>
    /// <exception cref="FileNotFoundException"></exception>
    public static string GetResourceAsText(string resourcePath, Assembly? assembly = null)
    {
      if (assembly == null) assembly = Assembly.GetCallingAssembly();
      return RawGetResourceAsText(assembly, resourcePath);
    }

    //public static Image GetResourceAsImage(string resourcePath, Assembly assembly = null)
    //{
    //  if (assembly == null) assembly = Assembly.GetCallingAssembly();
    //  return RawGetResourceAsImage(assembly, resourcePath);
    //}

    /// <summary>
    ///   Gets the resource as stream.
    /// </summary>
    /// <param name="resourcePath">The resource path.</param>
    /// <param name="assembly">The assembly.</param>
    /// <returns></returns>
    public static Stream GetResourceAsStream(string resourcePath, Assembly? assembly = null)
    {
      if (assembly == null) assembly = Assembly.GetCallingAssembly();
      return RawGetResourceAsStream(assembly, resourcePath);
    }

    private static bool RawResourceExists(Assembly ass, string resourcePath)
    {
      Stream rStream;

      rStream = ass.GetManifestResourceStream(resourcePath);
      return rStream != null;
    }

    private static string RawGetResourceAsText(Assembly ass, string resourcePath)
    {
      Stream rStream;
      StreamReader sReader;

      rStream = ass.GetManifestResourceStream(resourcePath);
      if (rStream == null)
        throw new FileNotFoundException(string.Format("Cannot find resource {0}", resourcePath));
      sReader = new StreamReader(rStream);
      return sReader.ReadToEnd();
    }

    private static Stream RawGetResourceAsStream(Assembly ass, string resourcePath)
    {
      Stream rStream;

      rStream = ass.GetManifestResourceStream(resourcePath);
      if (rStream == null)
        throw new FileNotFoundException(string.Format("Cannot find resource {0}", resourcePath));
      return rStream;
    }
  }
}
