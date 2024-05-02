using Isg.DyeDurham.NameSorter.Lib.Comparers;
using Isg.DyeDurham.NameSorter.Lib.DataTypes;
using Isg.DyeDurham.NameSorter.Lib.Exceptions;
using Isg.DyeDurham.NameSorter.Lib.Models;
using Isg.DyeDurham.NameSorter.Lib.Utils;
using System;
using System.IO;
using System.Linq;

namespace Isg.DyeDurham.NameSorter.Lib.Engines
{
    /// <summary>
    /// This engine sorts names and generates a raw file output of the resulting sort.
    /// </summary>
    public class NameSorterEngine
    {

        private Name[] _inputNames;

        /// <summary>
        /// Constructor with parameters.
        /// </summary>
        /// <param name="lines">The names in lines to be sorted.</param>
        public NameSorterEngine(string[] lines) : this()
        {
            string[] temporaryLines = lines ?? throw new ArgumentNullException(nameof(lines));
            _inputNames = temporaryLines.Select(x => NameUtils.Get(x)).ToArray();
        }

        /// <summary>
        /// Default constructor.
        /// </summary>
        private NameSorterEngine()
        {
        }

        /// <summary>
        /// Retrieves the raw file contents of the ordered names.
        /// </summary>
        /// <returns>Returns the raw file contents of the ordered names.</returns>
        public string GenerateRaw()
        {
            return Sort().GenerateRaw();
        }

        /// <summary>
        /// Invokes the sorting algorythm for the input names.
        /// <summary>
        /// <returns>Returns the generated result.</returns>
        public NameSorterResult Sort()
        {
            Name[] orderedNames = _inputNames.OrderBy(x => x, new NameComparer()).ToArray();

            var result = new NameSorterResult(orderedNames);

            return result;
        }
    }
}
